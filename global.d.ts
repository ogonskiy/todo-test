
import {
  AxiosRequestConfig,
  AxiosPromise
} from 'axios'

declare global {
  interface HTTPClient {
    get(url: string, config?: AxiosRequestConfig): AxiosPromise;

    request(config: AxiosRequestConfig): AxiosPromise;

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise;

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
  }

  type NoteTask = {
    description: string;
    completed: boolean;
  }

  type ReadNoteTaskResponse = NoteTask & {
    _id: string;
  }

  type Note = {
    title: string;
    tasks: NoteTask[];
  }

  type ReadNoteResponse = {
    title: string;
    tasks: ReadNoteTaskResponse[];
    updatedAt: string;
    createdAt: string;
    _id: string;
    _v: string;
  }

  type ReadNotePayload = {
    id: string;
  }

  type DeleteNotePayload = {
    id: string;
  }

  type UpdateNotePayload = Note & { id: string }
}
