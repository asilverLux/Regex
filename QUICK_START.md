# 🚀 Quick Start Guide

## Your Room Matching Service is Ready!

### ✅ What You Have Now

1. **Web API** that accepts POST requests with `supplierroom` and `eps_room`
2. **Web Interface** for easy testing
3. **Multiple deployment options** ready to go
4. **Production build** configured for Railway

### 🏃‍♂️ Immediate Testing

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open in browser:** http://localhost:3000

3. **Test the API directly:**
   ```bash
   curl -X POST http://localhost:3000/compare-rooms \
     -H "Content-Type: application/json" \
     -d '{
       "supplierroom": "deluxe room, 1 king bed",
       "eps_room": "deluxe room, king"
     }'
   ```

### 📡 API Endpoint

**POST** `/compare-rooms`

**Request Body:**
```json
{
  "supplierroom": "your supplier room description",
  "eps_room": "your expedia room description"
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "supplierroom": "deluxe room, 1 king bed",
    "eps_room": "deluxe room, king",
    "isMatch": true,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### 🌐 Deploy to Railway (Fixed!)

**Step 1: Build the project**
```bash
npm run build
```

**Step 2: Deploy to Railway**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (free)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically:
   - Install dependencies
   - Run `npm run build`
   - Start with `npm start`

**Free tier:** $5 credit monthly (enough for small apps)

### 🔧 Environment Variables

- `PORT`: Server port (Railway sets this automatically)
- `NODE_ENV`: Environment (development/production)

### 📱 Integration Examples

**JavaScript/Fetch:**
```javascript
const response = await fetch('https://your-app.railway.app/compare-rooms', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    supplierroom: 'deluxe room, 1 king bed',
    eps_room: 'deluxe room, king'
  })
});
const result = await response.json();
```

**Python:**
```python
import requests

response = requests.post('https://your-app.railway.app/compare-rooms', json={
    'supplierroom': 'deluxe room, 1 king bed',
    'eps_room': 'deluxe room, king'
})
result = response.json()
```

**cURL:**
```bash
curl -X POST https://your-app.railway.app/compare-rooms \
  -H "Content-Type: application/json" \
  -d '{"supplierroom": "deluxe room, 1 king bed", "eps_room": "deluxe room, king"}'
```

### 🎯 Next Steps

1. **Build locally:** `npm run build`
2. **Test locally:** `npm start`
3. **Deploy to Railway** (follow steps above)
4. **Integrate** with your existing systems
5. **Monitor** using the `/health` endpoint

### 🆘 Need Help?

- Check the full `deploy.md` for detailed deployment steps
- Use the `/health` endpoint to verify service status
- Check Railway logs for any errors
- The web interface at `/` provides easy testing

---

**Your service is now properly configured for Railway deployment! 🎉**
