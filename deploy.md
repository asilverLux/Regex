# Deployment Guide for Room Matching Service

This guide covers multiple ways to deploy your room matching service.

## 🚀 Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access the service:**
   - Web interface: http://localhost:3000
   - API endpoint: http://localhost:3000/compare-rooms
   - Health check: http://localhost:3000/health

## 🌐 Deployment Options

### Option 1: Heroku (Free Tier Available)

1. **Install Heroku CLI:**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Or download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku app:**
   ```bash
   heroku login
   heroku create your-room-matching-app
   ```

3. **Deploy:**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

4. **Set environment variables (optional):**
   ```bash
   heroku config:set NODE_ENV=production
   ```

### Option 2: Railway (Free Tier Available)

1. **Go to [Railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Deploy automatically on push**

### Option 3: Render (Free Tier Available)

1. **Go to [Render.com](https://render.com)**
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Set build command:** `npm install`
5. **Set start command:** `npm start`

### Option 4: DigitalOcean App Platform

1. **Go to [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)**
2. **Connect your GitHub repository**
3. **Configure as Node.js app**
4. **Deploy**

### Option 5: AWS Lambda + API Gateway

1. **Install AWS CLI and configure credentials**
2. **Use serverless framework:**
   ```bash
   npm install -g serverless
   serverless create --template aws-nodejs-typescript
   ```

3. **Deploy:**
   ```bash
   serverless deploy
   ```

## 📦 Production Build

For production, you can build the TypeScript to JavaScript:

1. **Install TypeScript:**
   ```bash
   npm install -g typescript
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Start production server:**
   ```bash
   node dist/server.js
   ```

## 🔧 Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## 📱 API Usage Examples

### cURL
```bash
curl -X POST http://localhost:3000/compare-rooms \
  -H "Content-Type: application/json" \
  -d '{
    "supplierroom": "deluxe room, 1 king bed",
    "eps_room": "deluxe room, king"
  }'
```

### JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:3000/compare-rooms', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    supplierroom: 'deluxe room, 1 king bed',
    eps_room: 'deluxe room, king'
  })
});

const result = await response.json();
console.log(result);
```

### Python
```python
import requests

response = requests.post('http://localhost:3000/compare-rooms', json={
    'supplierroom': 'deluxe room, 1 king bed',
    'eps_room': 'deluxe room, king'
})

result = response.json()
print(result)
```

## 🧪 Testing

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open http://localhost:3000 in your browser**

3. **Test with different room descriptions**

4. **Use the health check endpoint:**
   ```bash
   curl http://localhost:3000/health
   ```

## 📊 Monitoring

- **Health check:** `/health` endpoint for uptime monitoring
- **Logs:** Check console output for errors
- **Performance:** Monitor response times

## 🔒 Security Considerations

- Add rate limiting for production
- Consider adding authentication if needed
- Validate input thoroughly (already implemented)
- Use HTTPS in production
- Set appropriate CORS headers if needed

## 🚨 Troubleshooting

- **Port already in use:** Change PORT environment variable
- **Module not found:** Run `npm install`
- **TypeScript errors:** Check import paths and file extensions
- **Deployment fails:** Check build logs and environment variables
