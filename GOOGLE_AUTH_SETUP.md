# Google Authentication Setup Guide

## 🔧 Setup Instructions

### 1. Get Google OAuth Client ID

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API or Google Identity Services API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application** as the application type
6. Add your domain to **Authorized JavaScript origins**:
   - For development: `http://localhost:3000`
   - For production: `https://yourdomain.com`
7. Copy the Client ID

### 2. Environment Configuration

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-client-id-here.apps.googleusercontent.com
```

⚠️ **Important**: Replace the placeholder client ID in the code with your actual client ID.

### 3. Features Included

✅ **Google Sign-In Button**: Appears when user is not logged in
✅ **User Avatar Dropdown**: Shows when user is logged in
✅ **User Information Display**: Name and email in dropdown
✅ **Sign Out Functionality**: Clears user session
✅ **Persistent Login**: User stays logged in across browser sessions
✅ **Account Settings Link**: Direct link to account page

### 4. Security Notes

- The Google Client ID is safe to expose publicly (it's meant to be public)
- User authentication tokens are handled securely by Google
- User data is only stored in localStorage for convenience
- For production, consider implementing server-side session management

### 5. Customization

You can customize the appearance by modifying:
- `src/components/NavBar.tsx` - Main navigation and auth UI
- `src/contexts/AuthContext.tsx` - Authentication logic
- Button styles and dropdown menu appearance

### 6. Testing

1. Start your development server: `npm run dev`
2. Click "Sign in with Google" in the navigation
3. Complete Google OAuth flow
4. Verify user avatar and dropdown menu appear
5. Test sign out functionality
