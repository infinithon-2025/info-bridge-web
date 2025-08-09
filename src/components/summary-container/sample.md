# Sample Resource Summary

This is a sample markdown document to demonstrate the markdown rendering capability in the SummaryContent component.

## Project Overview

This project contains multiple features including:

- User authentication system
- Data visualization components
- API integration with external services

## Technical Stack

### Frontend

- **React** - UI framework
- **TypeScript** - Type safety
- **Styled Components** - CSS-in-JS styling

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database

## Code Example

```javascript
const fetchData = async () => {
  try {
    const response = await axios.get('/api/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
```

## Important Notes

> This is a sample document for testing purposes. In a real implementation, the markdown content would come from the `sampleResources` prop.

### Features Implemented

1. ✅ Markdown parsing
2. ✅ Code syntax highlighting
3. ✅ Responsive design
4. 🔄 Data fetching (in progress)
5. ❌ User notifications (not started)

---

**Last updated:** January 2025
