export type Img = string;
export type Text = string;
export type UserId = number;

export type Report = {
  imgs: Img[];
  text: Text;
  user: Text;
};

export type SessionReport = Report & {
  debounceControllerMedia: any;
};
