'use client'
import styles from './NoteForm.module.css';
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api/clientApi";
import { useRouter } from "next/navigation";
import { NoteDraft } from "@/lib/store/noteStore";




export default function NoteForm() {
  
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({
      ...draft, [event.target.name]: event.target.value,
    })
  }


  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (note: NoteDraft) => 
      createNote(note.title, note.content, note.tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all')
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, content, tag } = draft;
    mutate({title, content, tag} as NoteDraft)
  }
  const handleCancel = () => {
    clearDraft();
    router.push('/notes/filter/all')
  }
    return (
                <form className={styles.form} onSubmit={handleSubmit}>
  <div className={styles.formGroup}>
    <label htmlFor="title">Title</label>
    <input id="title" type="text" name="title" className={styles.input} value={draft?.title || ''} onChange={handleChange} />
  </div>

  <div className={styles.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea
      id="content"
      name="content"
      rows={8}
            className={styles.textarea}
            value={draft?.content || ''} onChange={handleChange}
    ></textarea>

  </div>

  <div className={styles.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select id="tag" name="tag" className={styles.select} value={draft?.tag || 'Todo'} onChange={handleChange}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>

  </div>

  <div className={styles.actions}>
    <button onClick={handleCancel} type="button" className={styles.cancelButton}>
      Cancel
    </button>
    <button
      type="submit"
      className={styles.submitButton}
    >
      Create
    </button>
  </div>
    </form>
  )
}