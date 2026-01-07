// src/hooks/useTasks.js
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
    let mounted = true
    let unsubscribe = null

    // Si no hay uid, limpiamos el estado, pero lo hacemos en la siguiente microtarea
    if (!uid) {
      // evitar setState sincrónico dentro del effect
      Promise.resolve().then(() => {
        if (!mounted) return
        setTasks([])
        setLoading(false)
      })
      return () => {
        mounted = false
      }
    }

    const q = query(
      collection(db, 'users', uid, 'tasks'),
      orderBy('createdAt', 'desc')
    )

    unsubscribe = onSnapshot(
      q,
      snapshot => {
        if (!mounted) return
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setTasks(data)
        setLoading(false)
      },
      error => {
        console.error('useTasks onSnapshot error', error)
        if (mounted) setLoading(false)
      }
    )

    return () => {
      mounted = false
      if (typeof unsubscribe === 'function') unsubscribe()
    }
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
