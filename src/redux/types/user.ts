export interface IUserState {
  userRole: number; // 0: 超级管理员 1: 管理员 2: 普通用户 数值越小权限越大
  permissions: string[]; // 权限列表 *:*:* 所有权限
  loading: boolean;
}
