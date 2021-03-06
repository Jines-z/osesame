import { RouteComponentProps } from 'react-router-dom'
import { LoadingComponentProps } from 'react-loadable'
import { FlyPromise } from 'flyio'
import { ReactChild, ReactFragment, ReactPortal } from 'react'

declare global {
  export interface IProps extends RouteComponentProps {
    [key: string]: any;
  }

  export interface LoginInfo {
    id: string;
    name: string;
    username: string;
    password: string;
    createTime: string;
    editorTime: string;
    type: number;
    remark?: string;
  }

  export interface NoteInfo {
    id: string;
    title: string;
    content: string;
    createTime: string;
    editorTime: string;
    type: number;
  }

  export interface IParam {
    [key: string]: any;
  }

  export interface IResponse {
    success: boolean;
    meg: string;
    data: any;
  }

  export interface IRPromise extends FlyPromise<IResponse> {
    [key: string]: any;
  }

  export type IReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

  export interface ILoadable extends LoadingComponentProps {
    [key: string]: any;
  }

  export const IPC: any
}
