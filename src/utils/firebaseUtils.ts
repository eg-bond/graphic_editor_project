import { Project } from '@/types/localStorageTypes';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { FbCollectionNames } from '@/types/firebaseTypes';

// То, как в firebase сейчас выглядит отдельный документ в коллекции projects
interface ProjectInFirebase {
  userId: string;
  name: string;
  // width и height теперь хранятся внутри historyItem
  createdAt: Date;
  updatedAt: Date;
  // Не стал добавлять туда поле data (как сейчас в LS),
  // думаю стоит создать отдельную коллекцию для хранения data проектов
}

export const createProject = async (
  project: Omit<Project, 'id'>, userId: string,
) => {
  try {
    const docRef = await addDoc(collection(db, FbCollectionNames.Projects), {
      ...project,
      userId, // для связи проекта с конкретным пользователем (user.uid)
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getProjectsByUser = async (userId: string): Promise<Project[]> => {
  const q = query(
    collection(db, FbCollectionNames.Projects),
    where('userId', '==', userId),
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
};

export const updateProject = async (projectId: string, data: Partial<Project>) => {
  await updateDoc(doc(db, FbCollectionNames.Projects, projectId), {
    ...data,
    updatedAt: new Date(),
  });
};

export const deleteProject = async (projectId: string) => {
  await deleteDoc(doc(db, FbCollectionNames.Projects, projectId));
};
