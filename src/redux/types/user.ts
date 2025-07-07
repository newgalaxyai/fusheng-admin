export interface IUserState {
  userRole: string[]; // 用户角色列表
  permissions: string[]; // 权限列表 *:*:* 所有权限
  loading: boolean;
}
