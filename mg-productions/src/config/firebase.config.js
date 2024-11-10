import { getApp,getApps,initializeApp} from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAi76VcJx7yYbhCKsDlv57NtiwXGqssDN0",
  authDomain: "mgproductions-10d38.firebaseapp.com",
  projectId: "mgproductions-10d38",
  storageBucket: "mgproductions-10d38.firebasestorage.app",
  messagingSenderId: "804540165391",
  appId: "1:804540165391:web:f79746447a1799a6da627a",
  measurementId: "G-Y1319RWST0"
};

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const storage = getStorage(app);

export {app , storage};