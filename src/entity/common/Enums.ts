export enum Type {
  STUDY = 'STUDY',
  PROJECT = 'PROJECT',
}

export enum PostStatus {
  READY = 'READY',
  PROGRESS = 'PROGRESS',
  PROGRESS_END = 'PROGRESS_END',
  DONE = 'DONE',
}

export enum TeamMemberStatus {
  READY = 'READY',
  REJECT = 'REJECT',
  ACCEPT = 'ACCEPT',
}

export enum TeamInviteType {
  SELF = 'SELF',
  OTHERS = 'OTHERS',
}

export enum PostApplyStatus {
  OWNER = 'OWNER',
  INVITED = 'INVITED',
  NOT_APPLIED = 'NOT_APPLIED',
  APPLIED = 'APPLIED'
}