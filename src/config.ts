import { Injectable } from 'qzx-ioc';
import path from 'path';
import AuthInterceptor from './interceptors/Auth';
import ControllerInterceptor from './interceptors/Controller';
import LoggerInterceptor from './interceptors/Logger';
import StaticInterceptor from './interceptors/Static';

@Injectable()
export default class Config {
  PORT = 8090;

  KEYS: string[] = [];

  STATIC_PATH = path.join(__dirname, 'static');

  INTERCEPTORS = [
    LoggerInterceptor, // 日志处理
    AuthInterceptor, // 权限处理
    StaticInterceptor, // 静态文件处理
    ControllerInterceptor, // Rest请求处理
  ];
}
