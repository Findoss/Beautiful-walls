export type Img = string;
export type Text = string;
export type UserId = number;

export type Report = {
  imgs: Img[];
  text: Text;
};

export type Reports = Record<UserId, Report>;

type Props = {
  id: UserId;
};

export type PropsImg = Props & { img: Img };

export type PropsText = Props & { text: Text };
