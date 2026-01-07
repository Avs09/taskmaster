import { useEffect, useState } from 'react'
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

export default function useTasks(uid) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) {
      setTasks([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'users', uid, 'tasks'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setTasks(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [uid])

  function addTask(title) {
    return addDoc(collection(db, 'users', uid, 'tasks'), {
      title,
      completed: false,
      createdAt: serverTimestamp(),
    })
  }

  function toggleTask(task) {
    const ref = doc(db, 'users', uid, 'tasks', task.id)
    return updateDoc(ref, { completed: !task.completed })
  }

  function deleteTask(task) {
    const ref = doc(db, 'users', uid, 'tasks', task.id)
    return deleteDoc(ref)
  }

  return { tasks, loading, addTask, toggleTask, deleteTask }
}
