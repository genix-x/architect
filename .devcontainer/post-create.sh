#!/bin/bash

# Make script executable
chmod +x .devcontainer/post-create.sh

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to compare versions
version_compare() {
    local version1=$1
    local version2=$2
    if [[ "$(printf '%s\n' "$version2" "$version1" | sort -V | head -n1)" = "$version2" ]]; then
        return 0 # version1 >= version2
    else
        return 1 # version1 < version2
    fi
}

print_status "Starting development environment setup..."

# Update system packages
print_status "Updating system packages..."
sudo apt-get update -qq


# Check and install AWS CLI
if command_exists aws; then
    AWS_VERSION=$(aws --version 2>&1 | cut -d' ' -f1 | cut -d'/' -f2)
    print_warning "AWS CLI is already installed (version: $AWS_VERSION)"
else
    print_status "AWS CLI will be installed via devcontainer features"
fi


# Check and install AWS SAM CLI (Ubuntu 22.04 - Dev Container)
# if command_exists sam; then
#     SAM_VERSION=$(sam --version | cut -d' ' -f4)
#     REQUIRED_SAM_VERSION="1.100.0"
#     print_warning "AWS SAM CLI is already installed (version: $SAM_VERSION)"
    
#     if version_compare "$SAM_VERSION" "$REQUIRED_SAM_VERSION"; then
#         print_status "AWS SAM CLI version is sufficient"
#     else
#         print_warning "AWS SAM CLI version is outdated. Upgrading..."
#         # Uninstall old version on Ubuntu
#         sudo rm -rf /usr/local/aws-sam-cli
#         sudo rm -f /usr/local/bin/sam
#     fi
# fi

# if ! command_exists sam || ! version_compare "$SAM_VERSION" "$REQUIRED_SAM_VERSION"; then
#     print_status "Installing AWS SAM CLI for Ubuntu 22.04..."
    
#     # Detect architecture (but in dev container, it's usually x86_64)
#     ARCH=$(uname -m)
#     print_status "🔧 Detected architecture: $ARCH"
    
#     if [[ "$ARCH" == "x86_64" ]]; then
#         SAM_CLI_URL="https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip"
#         SAM_FILE="aws-sam-cli-linux-x86_64.zip"
#     elif [[ "$ARCH" == "aarch64" ]] || [[ "$ARCH" == "arm64" ]]; then
#         SAM_CLI_URL="https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-arm64.zip"
#         SAM_FILE="aws-sam-cli-linux-arm64.zip"
#     else
#         print_error "❌ Unsupported architecture: $ARCH"
#         exit 1
#     fi
    
#     # Ensure required tools are installed
#     print_status "📦 Installing required dependencies..."
#     sudo apt-get update -qq
#     sudo apt-get install -y wget unzip curl
    
#     # Download SAM CLI
#     print_status "⬇️ Downloading AWS SAM CLI..."
#     if wget -q "$SAM_CLI_URL" -O "$SAM_FILE"; then
#         print_status "✅ Download completed"
#     else
#         print_error "❌ Download failed"
#         exit 1
#     fi
    
#     # Extract and install
#     print_status "📂 Extracting SAM CLI..."
#     if unzip -q "$SAM_FILE" -d sam-installation; then
#         print_status "✅ Extraction completed"
#     else
#         print_error "❌ Extraction failed"
#         rm -f "$SAM_FILE"
#         exit 1
#     fi
    
#     # Install
#     print_status "🔧 Installing SAM CLI..."
#     if sudo ./sam-installation/install; then
#         print_status "✅ Installation completed"
#     else
#         print_error "❌ Installation failed"
#         rm -rf sam-installation "$SAM_FILE"
#         exit 1
#     fi
    
#     # Cleanup
#     rm -rf sam-installation "$SAM_FILE"
    
#     # Verification
#     print_status "🔍 Verifying SAM CLI installation..."
    
#     # Refresh PATH
#     hash -r
    
#     if command -v sam >/dev/null 2>&1; then
#         SAM_LOCATION=$(which sam)
#         print_status "✅ SAM CLI found at: $SAM_LOCATION"
        
#         if sam --version >/dev/null 2>&1; then
#             NEW_SAM_VERSION=$(sam --version | cut -d' ' -f4)
#             print_status "✅ SAM CLI version: $NEW_SAM_VERSION"
#             print_status "✅ AWS SAM CLI installation completed successfully!"
#         else
#             print_error "❌ SAM CLI found but --version command failed"
#         fi
#     else
#         print_error "❌ SAM CLI verification failed"
#         print_status "🔍 PATH: $PATH"
#         print_status "🔍 Checking /usr/local/bin/sam..."
#         ls -la /usr/local/bin/sam 2>/dev/null || echo "Not found"
#     fi
# fi



# Check and install Docker Compose
if command_exists docker-compose; then
    COMPOSE_VERSION=$(docker-compose --version | cut -d' ' -f3 | cut -d',' -f1)
    REQUIRED_COMPOSE_VERSION="2.0.0"
    print_warning "Docker Compose is already installed (version: $COMPOSE_VERSION)"
    
    if version_compare "$COMPOSE_VERSION" "$REQUIRED_COMPOSE_VERSION"; then
        print_status "Docker Compose version is sufficient"
    else
        print_warning "Docker Compose version is outdated. Upgrading..."
        sudo rm -f /usr/local/bin/docker-compose
    fi
fi

if ! command_exists docker-compose; then
    print_status "Installing Docker Compose..."
    sudo curl -sL "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    print_status "Docker Compose installed successfully"
fi

# Install additional tools (check each one)
print_status "Checking and installing additional tools..."

TOOLS_TO_INSTALL=""

if ! command_exists curl; then
    TOOLS_TO_INSTALL="$TOOLS_TO_INSTALL curl"
fi

if ! command_exists wget; then
    TOOLS_TO_INSTALL="$TOOLS_TO_INSTALL wget"
fi

if ! command_exists unzip; then
    TOOLS_TO_INSTALL="$TOOLS_TO_INSTALL unzip"
fi

if ! command_exists jq; then
    TOOLS_TO_INSTALL="$TOOLS_TO_INSTALL jq"
fi

if ! command_exists git; then
    TOOLS_TO_INSTALL="$TOOLS_TO_INSTALL git"
fi

if [ -n "$TOOLS_TO_INSTALL" ]; then
    print_status "Installing missing tools:$TOOLS_TO_INSTALL"
    sudo apt-get install -y $TOOLS_TO_INSTALL
else
    print_status "All required system tools are already installed"
fi

# Check and install Python dependencies
print_status "Checking Python dependencies..."

PYTHON_PACKAGES=("boto3" "pytest" "requests")
PYTHON_TO_INSTALL=""

for package in "${PYTHON_PACKAGES[@]}"; do
    if ! python3 -c "import $package" 2>/dev/null; then
        PYTHON_TO_INSTALL="$PYTHON_TO_INSTALL $package"
    else
        print_warning "Python package '$package' is already installed"
    fi
done

if [ -n "$PYTHON_TO_INSTALL" ]; then
    print_status "Installing Python packages:$PYTHON_TO_INSTALL"
    pip3 install --user $PYTHON_TO_INSTALL
else
    print_status "All required Python packages are already installed"
fi

# Check and install Node.js dependencies
print_status "Checking Node.js dependencies..."

NODE_PACKAGES=("aws-sdk" "serverless")
NODE_TO_INSTALL=""

for package in "${NODE_PACKAGES[@]}"; do
    if ! npm list -g $package >/dev/null 2>&1; then
        NODE_TO_INSTALL="$NODE_TO_INSTALL $package"
    else
        print_warning "Node.js package '$package' is already installed globally"
    fi
done

if [ -n "$NODE_TO_INSTALL" ]; then
    print_status "Installing Node.js packages:$NODE_TO_INSTALL"
    npm install -g $NODE_TO_INSTALL
else
    print_status "All required Node.js packages are already installed"
fi

# Create helper scripts directory
if [ ! -d "~/scripts" ]; then
    print_status "Creating scripts directory..."
    mkdir -p ~/scripts
else
    print_warning "Scripts directory already exists"
fi

# Make all scripts executable
if [ -d "./scripts" ]; then
    print_status "Making scripts executable..."
    chmod +x ./scripts/*.sh
fi

# Final version check and summary
print_status "=== Installation Summary ==="

if command_exists sam; then
    echo "✅ AWS SAM CLI: $(sam --version | cut -d' ' -f4)"
else
    print_error "❌ AWS SAM CLI: Not installed"
fi

if command_exists aws; then
    echo "✅ AWS CLI: $(aws --version 2>&1 | cut -d' ' -f1 | cut -d'/' -f2)"
else
    print_error "❌ AWS CLI: Not installed"
fi

if command_exists docker-compose; then
    echo "✅ Docker Compose: $(docker-compose --version | cut -d' ' -f3 | cut -d',' -f1)"
else
    print_error "❌ Docker Compose: Not installed"
fi

if command_exists node; then
    echo "✅ Node.js: $(node --version)"
else
    print_error "❌ Node.js: Not installed"
fi

if command_exists python3; then
    echo "✅ Python: $(python3 --version | cut -d' ' -f2)"
else
    print_error "❌ Python: Not installed"
fi

print_status "✅ Development environment setup complete!"
