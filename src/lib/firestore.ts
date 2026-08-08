import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Chapter, Material, MaterialType, Notice, StudentStatus } from "@/types";

/** Live-subscribe to chapters for a class + subject, ordered for display. */
export function subscribeChapters(
  classId: string,
  subject: string,
  cb: (chapters: Chapter[]) => void
) {
  const q = query(
    collection(db, "chapters"),
    where("classId", "==", classId),
    where("subject", "==", subject),
    orderBy("order", "asc")
  );
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Chapter)));
  });
}

/** Live-subscribe to materials for a class + subject, optionally filtered by type. */
export function subscribeMaterials(
  classId: string,
  subject: string,
  types: MaterialType[],
  cb: (materials: Material[]) => void
) {
  const q = query(
    collection(db, "materials"),
    where("classId", "==", classId),
    where("subject", "==", subject),
    orderBy("updatedAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    const all = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Material));
    cb(types.length ? all.filter((m) => types.includes(m.type)) : all);
  });
}

export function subscribeNotices(cb: (notices: Notice[]) => void) {
  const q = query(collection(db, "notices"), orderBy("postedAt", "desc"));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Notice)));
  });
}

export function subscribeAllStudents(cb: (students: any[]) => void) {
  const q = query(collection(db, "students"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ uid: d.id, ...d.data() })));
  });
}

export async function setStudentStatus(uid: string, status: StudentStatus) {
  await updateDoc(doc(db, "students", uid), {
    status,
    ...(status === "approved" ? { approvedAt: Date.now() } : {}),
  });
}

export async function deleteStudent(uid: string) {
  await deleteDoc(doc(db, "students", uid));
}

export async function addNotice(title: string, body: string) {
  await addDoc(collection(db, "notices"), {
    title,
    body,
    postedAt: Date.now(),
  });
}

export async function deleteNotice(id: string) {
  await deleteDoc(doc(db, "notices", id));
}

export async function deleteMaterial(id: string) {
  await deleteDoc(doc(db, "materials", id));
}
