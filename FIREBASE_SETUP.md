# Firebase Setup Guide for Karunya Special School

This guide will walk you through setting up Firebase for the Karunya Special School website.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "karunya-special-school")
4. Follow the setup wizard steps
5. Once created, click on the project to enter the Firebase Console

## 2. Set Up Authentication

1. In the Firebase Console, click on "Authentication" in the left sidebar
2. Go to the "Sign-in method" tab
3. Enable "Email/Password" authentication
4. Click "Save"

### Create Admin User

1. In the Authentication section, go to the "Users" tab
2. Click "Add user"
3. Enter the admin email and password
4. Click "Add user"
5. Note down the email and password for later use

## 3. Set Up Firestore Database

1. In the Firebase Console, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location closest to your users
5. Click "Enable"

## 4. Set Up Storage

1. In the Firebase Console, click on "Storage" in the left sidebar
2. Click "Get started"
3. Click "Next"
4. Choose a location closest to your users
5. Click "Done"

## 5. Get Firebase Configuration

1. In the Firebase Console, click on the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to the "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "karunya-web")
6. Copy the configuration object

## 6. Set Up Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Replace the values with those from your Firebase configuration.

## 7. Set Up Security Rules

### Firestore Rules

Go to Firestore Database > Rules and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules

Go to Storage > Rules and add:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 8. Testing the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/admin/login`
3. Log in with the admin credentials you created
4. Try adding, editing, and deleting activities to verify everything works

## Troubleshooting

1. **Authentication Issues**
   - Verify your Firebase configuration in `.env.local`
   - Check if the admin user exists in Firebase Authentication
   - Ensure email/password authentication is enabled

2. **Database Issues**
   - Verify Firestore rules allow the operations you're trying to perform
   - Check if the database is in the correct region
   - Ensure you're using the correct collection names

3. **Storage Issues**
   - Verify Storage rules allow the operations you're trying to perform
   - Check if the bucket name matches your configuration
   - Ensure file sizes are within limits

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Firebase Security Rules](https://firebase.google.com/docs/rules) 