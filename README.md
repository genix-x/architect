# AWS Lambda DevKit

A comprehensive development toolkit for building and deploying AWS Lambda-based applications, with a focus on conversational AI and bot development across multiple environments.

## 🚀 Features

- **Multi-Environment Support**: Seamless switching between development, staging, and production environments
- **AWS SSO Integration**: Secure authentication with AWS Single Sign-On
- **Bot Application Templates**: Pre-configured templates for various bot types
- **AWS SAM Integration**: Local testing and deployment capabilities
- **Infrastructure as Code**: Automated deployment with AWS services integration

## 🏗️ Architecture

This toolkit supports building various types of bot applications:

- **Caller Bot**: Outbound call handling applications
- **Callee Bot**: Inbound call processing applications  
- **Translator Call Bot**: Real-time translation during calls
- **Conversational Bot**: Interactive chat-based applications
- **Reinforced Call Bot**: AI-enhanced call processing with learning capabilities

### AWS Services Integration

- **AWS Lambda**: Serverless compute for bot logic
- **API Gateway**: RESTful API endpoints
- **DynamoDB + DAX**: High-performance data storage with caching
- **Step Functions**: Workflow orchestration
- **AWS Bedrock**: AI/ML capabilities for conversational features

## 🛠️ Prerequisites

- AWS CLI installed and configured
- AWS SSO access to target environments
- Docker (for development container support)
- Make utility
- Node.js/Python (depending on your Lambda runtime)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/genix-x/aws-lambda-devkit.git
cd aws-lambda-devkit
```

2. Set up your development environment:
```bash
make help  # View available commands
make aws-login  # Login to development environment
```

## 🌍 Environment Management

The toolkit provides easy environment switching with the following commands:

### Development Environment
```bash
make aws-dev
```
- AWS Account: `762924053780`
- Region: `us-east-1`
- Profile: `dev`

### Staging Environment
```bash
make aws-staging
```
- AWS Account: `896035377897`
- Region: `us-east-1`
- Profile: `staging`

### Production Environment
```bash
make aws-prod
```
- AWS Account: `429757513125`
- Region: `us-east-1`
- Profile: `prod`
- ⚠️ **Warning**: Production environment requires confirmation

### Utility Commands
```bash
make aws-who      # Show current AWS identity
make aws-logout   # Logout from AWS SSO
make aws-test     # Test AWS connection
```

## 🏃‍♂️ Quick Start

1. **Login to your development environment**:
```bash
make aws-dev
```

2. **Verify your connection**:
```bash
make aws-who
```

3. **Start developing your bot application** in the `core/` directory

4. **Test locally** using AWS SAM:
```bash
sam local start-api
```

5. **Deploy to your environment**:
```bash
sam deploy --guided
```

## 📁 Project Structure

```
aws-lambda-devkit/
├── core/                           # Core application code
├── generated-diagrams/             # Architecture diagrams
│   ├── aws_bedrock_image_processing.png
│   └── serverless_web_app.png
├── .gitignore                      # Git ignore rules
├── .envrc                          # Environment variables (auto-generated)
├── Makefile                        # Environment management commands
├── aws-lambda-devkit-devcontainer.txt  # Development container notes
└── README.md                       # This file
```

## 🔧 Development Workflow

1. **Environment Setup**: Use `make aws-dev` to configure your development environment
2. **Code Development**: Implement your bot logic in the `core/` directory
3. **Local Testing**: Use AWS SAM CLI for local testing and debugging
4. **Staging Deployment**: Deploy to staging using `make aws-staging`
5. **Production Release**: Deploy to production using `make aws-prod`

## 🔐 Security & Best Practices

- Environment variables are automatically managed and ignored in git
- AWS SSO is used for secure authentication
- Multi-environment isolation prevents accidental cross-environment deployments
- Production deployments require explicit confirmation

## 📚 Documentation

- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/)
- [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/)
- [AWS Bedrock User Guide](https://docs.aws.amazon.com/bedrock/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Check the AWS documentation for service-specific questions
- Review the Makefile for available commands: `make help`

## 🏷️ Version

Current version: **v1.0** - Initial release with multi-environment support and bot application templates.
