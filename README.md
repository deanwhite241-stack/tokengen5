# ESTAR ECOSYSTEM - Token Creation Platform

A comprehensive platform for creating, deploying, and managing ERC-20/BEP-20 tokens across multiple blockchain networks.

## 🚀 Features

### Token Creation
- **Multi-Chain Support**: Deploy on 25+ networks including Ethereum, BSC, Polygon, Arbitrum, Fantom, Avalanche, and more
- **Advanced Token Types**: Basic, Burnable, Mintable, Fee tokens, Redistribution tokens, and Advanced tokens
- **Token Vesting**: Configure linear vesting schedules for team, investors, and ecosystem allocations
- **Factory Deployment**: Gas-optimized deployment using factory contracts

### Presale & Launchpad
- **Multiple Sale Types**: Public presales, private sales, and fairlaunch
- **Anti-Bot Protection**: Advanced protection against front-running and sniping
- **Vesting Integration**: Built-in token vesting for sale participants
- **Auto-Listing**: Automatic DEX listing after successful presales
- **Referral System**: Built-in referral tracking and rewards

### Token Management
- **Metadata Management**: Add logos, descriptions, social links, and tags
- **Trust Badges**: KYC, Audit, and SAFU verification badges
- **Governance System**: Token holder voting and proposal system
- **Liquidity Locking**: Lock LP tokens to build trust
- **Airdrop Tools**: Multi-sender for token airdrops

### Admin Features
- **Badge Management**: Approve/revoke trust badges
- **Network Mode**: Switch between mainnet and testnet
- **Emergency Deployment**: Fallback deployment methods
- **Analytics Dashboard**: Track platform usage and statistics

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Ethers.js** for blockchain interaction
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **MySQL** database with connection pooling
- **JWT** authentication
- **Hardhat** for smart contract deployment
- **Rate limiting** and security middleware

### Smart Contracts
- **Solidity 0.8.19**
- **OpenZeppelin** contracts for security
- **Factory patterns** for gas optimization
- **Upgradeable contracts** where applicable

### Blockchain Integration
- **Multi-chain RPC** endpoints
- **Contract verification** on block explorers
- **Gas optimization** strategies
- **Fallback deployment** methods

## 📦 Installation

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- Git

### Setup
1. Clone the repository
```bash
git clone <repository-url>
cd token-saas-platform
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database
```bash
# Import the MySQL schema
mysql -u root -p < mysql_import.sql
```

5. Start the development servers
```bash
# Start both frontend and backend
npm run dev:all

# Or start separately
npm run dev      # Frontend only
npm run server   # Backend only
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
VITE_ESR_TOKEN_ADDRESS=0x742d35Cc6634C0532925a3b8D4C9db96590c6C8C
VITE_API_URL=http://localhost:3001
VITE_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
VITE_BSC_RPC_URL=https://bsc-dataseed.binance.org/
# ... other network RPC URLs
```

#### Backend (.env)
```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/tokenforge
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=tokenforge

# Authentication
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=32_byte_hex_key

# Network RPC URLs
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
BSC_RPC_URL=https://bsc-dataseed.binance.org/
# ... other network configurations

# Deployment
PRIVATE_KEY=your_deployment_private_key
EMERGENCY_DEPLOY_PRIVATE_KEY=your_emergency_key

# Platform Configuration
ESR_TOKEN_ADDRESS=0x742d35Cc6634C0532925a3b8D4C9db96590c6C8C
PLATFORM_WALLET=0x742d35Cc6634C0532925a3b8D4C9db96590c6C8C
ADMIN_ADDRESSES=0x742d35Cc6634C0532925a3b8D4C9db96590c6C8C
```

### Database Schema
The platform uses MySQL with the following main tables:
- `users` - User accounts and authentication
- `tokens` - Deployed token contracts
- `presales` - Token sale contracts
- `vesting_schedules` - Token vesting configurations
- `transactions` - Transaction audit trail
- `token_metadata` - Token logos, descriptions, links
- `badges` - Trust verification badges
- `governance_proposals` - DAO proposals and voting

## 🌐 Supported Networks

### Mainnets
- Ethereum (ETH)
- Binance Smart Chain (BNB)
- Polygon (MATIC)
- Arbitrum (ETH)
- Fantom (FTM)
- Avalanche (AVAX)
- Cronos (CRO)
- Core (CORE)
- DogeChain (DOGE)
- PulseChain (PLS)
- ZetaChain (ZETA)
- Unichain (UNI)
- Bitrock (BROCK)
- AlveyChain (ALV)
- OpenGPU (GPU)
- Base (ETH)
- ESR (ESR)

### Testnets
- Goerli (ETH)
- BSC Testnet (tBNB)
- Mumbai (MATIC)
- Arbitrum Sepolia (ETH)
- Fantom Testnet (FTM)
- Avalanche Fuji (AVAX)
- Cronos Testnet (CRO)
- Bitrock Testnet (BROCK)
- ESR Testnet (ESR)

## 🔐 Security Features

### Smart Contract Security
- OpenZeppelin battle-tested contracts
- Reentrancy protection
- Access control mechanisms
- Emergency pause functionality
- Multi-signature support

### Platform Security
- JWT authentication with signature verification
- Rate limiting on all endpoints
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- Helmet.js security headers

### Anti-Bot Protection
- Gas price limits
- Wallet cooldown periods
- Signature verification
- Whitelist-only periods
- Transaction monitoring

## 📊 API Documentation

### Authentication
```javascript
// Get authentication message
POST /api/auth/message
Body: { address: "0x..." }

// Login with signature
POST /api/auth/login
Body: { address: "0x...", signature: "0x...", message: "..." }

// Verify token
GET /api/auth/verify
Headers: { Authorization: "Bearer <token>" }
```

### Token Deployment
```javascript
// Deploy token
POST /api/deploy/token
Headers: { Authorization: "Bearer <token>" }
Body: {
  contractType: "BasicToken",
  constructorArgs: [...],
  network: "ethereum",
  verify: true
}

// Get deployment status
GET /api/deploy/status/:txHash?network=ethereum
```

### Contract Management
```javascript
// Get deployed contracts
GET /api/contracts/deployed
Headers: { Authorization: "Bearer <token>" }

// Get contract details
GET /api/contracts/:address
Headers: { Authorization: "Bearer <token>" }

// Get contract statistics
GET /api/contracts/:address/stats?network=ethereum
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend
npm run build

# Start production server
npm start
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Environment Setup
1. Configure production environment variables
2. Set up MySQL database with proper indexes
3. Configure network RPC endpoints
4. Set up SSL certificates
5. Configure domain and DNS
6. Set up monitoring and logging

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📈 Monitoring

### Health Checks
- `/health` - API health status
- Database connection monitoring
- RPC endpoint availability
- Contract deployment success rates

### Analytics
- Token deployment statistics
- Network usage patterns
- User engagement metrics
- Error tracking and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Documentation: [docs.estar.games](https://docs.estar.games)
- Discord: [ESTAR Community](https://discord.gg/estar)
- Email: support@estar.games

## 🔄 Updates

### Recent Updates
- Added multi-chain support for 25+ networks
- Implemented anti-bot protection for presales
- Added governance system for token holders
- Enhanced mobile responsiveness
- Improved security with rate limiting
- Added emergency deployment fallbacks
- Implemented trust badge system
- Added liquidity locking functionality
- Enhanced token metadata management
- Improved error handling and user feedback

### Roadmap
- [ ] Cross-chain bridge integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with more DEX platforms
- [ ] Enhanced governance features
- [ ] Multi-language support
- [ ] Advanced token economics tools
- [ ] Institutional features