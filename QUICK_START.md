# 🚀 Quick Start Guide

## Your Room Matching Service is Ready!

### ✅ What You Have Now

1. **Web API** that accepts POST requests with `supplierroom` and `eps_room`
2. **Web Interface** for easy testing
3. **Multiple deployment options** ready to go

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

### 🌐 Deploy to Production

**Option 1: Heroku (Recommended for beginners)**
```bash
heroku create your-app-name
git add .
git commit -m "Deploy room matching service"
git push heroku main
```

**Option 2: Railway**
- Go to [railway.app](https://railway.app)
- Connect your GitHub repo
- Deploy automatically

**Option 3: Render**
- Go to [render.com](https://render.com)
- Create Web Service
- Connect your repo

### 🔧 Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

### 📱 Integration Examples

**JavaScript/Fetch:**
```javascript
const response = await fetch('https://your-app.herokuapp.com/compare-rooms', {
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

response = requests.post('https://your-app.herokuapp.com/compare-rooms', json={
    'supplierroom': 'deluxe room, 1 king bed',
    'eps_room': 'deluxe room, king'
})
result = response.json()
```

**cURL:**
```bash
curl -X POST https://your-app.herokuapp.com/compare-rooms \
  -H "Content-Type: application/json" \
  -d '{"supplierroom": "deluxe room, 1 king bed", "eps_room": "deluxe room, king"}'
```

### 🎯 Next Steps

1. **Test locally** with `npm start`
2. **Choose deployment platform** (Heroku recommended)
3. **Deploy** following the deployment guide
4. **Integrate** with your existing systems
5. **Monitor** using the `/health` endpoint

### 🆘 Need Help?

- Check the full `deploy.md` for detailed deployment steps
- Use the `/health` endpoint to verify service status
- Check console logs for any errors
- The web interface at `/` provides easy testing

---

**Your service is ready to receive POST requests with `supplierroom` and `eps_room` parameters! 🎉**
