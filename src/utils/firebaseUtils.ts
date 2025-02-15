import { Project, Statuses } from '@/types/localStorageTypes';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { FbCollectionNames } from '@/types/firebaseTypes';
import { RootState } from '@/redux/store.ts';
import { notification } from 'antd';

export const createProject = async (
  newProject: Omit<Project, 'id'>, userId: string,
) => {
  try {
    const {
      data,
      ...project
    } = newProject;

    const docRef = await addDoc(collection(db, FbCollectionNames.Projects), {
      ...project,
      userId, // для связи проекта с конкретным пользователем (user.uid)
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await addDoc(collection(db, FbCollectionNames.ProjectData), {
      ...data,
      projectId: docRef.id,
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
    orderBy('createdAt', 'desc'),
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
};

export const getProjectData = async (projectId: string): Promise<{
  data: Project['data']; id: string;
}> => {
  const q = query(
    collection(db, FbCollectionNames.ProjectData),
    where('projectId', '==', projectId),
  );

  const { docs } = await getDocs(q);
  const data = docs[0].data() as unknown as Project['data'];
  if (!data) {
    throw new Error('Проект не найден');
  }
  return {
    id: docs[0].id,
    data: {
      historyItem: data.historyItem,
      historyIdCount: data.historyIdCount,
      layerIdCount: data.layerIdCount,
    },
  };
};

interface IUpdateProjectName {
  id: string;
  name: string;
}

export const updateProjectName = async ({ id, name }: IUpdateProjectName) => {
  try {
    await updateDoc(doc(db, FbCollectionNames.Projects, id), {
      name,
      updatedAt: new Date(),
    });

    return Statuses.Success;
  } catch (error) {
    notification.error({
      message: 'Ошибка при переименовании проекта',
      description: (error as Error).message,
    });
    return Statuses.Error;
  }
};

export const updateProjectData = async (
  state: RootState['history'],
): Promise<Statuses> => {
  const id = state.projectDataId;

  if (!id) {
    return Statuses.Error;
  }

  const newData = {
    historyItem: state.items[state.activeItemIndex],
    historyIdCount: state.historyIdCount,
    layerIdCount: state.layerIdCount,
  };

  try {
    await updateDoc(doc(db, FbCollectionNames.ProjectData, id), {
      ...newData,
      updatedAt: new Date(),
    });

    return Statuses.Success;
  } catch (error) {
    notification.error({
      message: 'Ошибка при сохранении проекта',
      description: (error as Error).message,
    });
    return Statuses.Error;
  }
};

export const deleteProject = async (projectId: string) => {
  const q = query(
    collection(db, FbCollectionNames.ProjectData),
    where('projectId', '==', projectId),
  );

  const querySnapshot = await getDocs(q);
  await Promise.all(querySnapshot.docs.map(async (data) => {
    await deleteDoc(doc(db, FbCollectionNames.ProjectData, data.id));
  }));

  await deleteDoc(doc(db, FbCollectionNames.Projects, projectId));
};
