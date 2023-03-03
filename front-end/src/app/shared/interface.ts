export interface ICourse {
  id: number;
  title: string;
  instructor: number;
  enrolled: number;
  overview: string;
  curriculum: [
    {
      title: string;
      lectures: [
        {
          title: string;
          type: string;
          contentLink: string;
        }
      ];
    }
  ];
}

export interface INotice {
  id: number;
  title: string;
  date: string;
}

export interface INotification {
  id: number;
  title: string;
  time: string;
}

export interface IInstructor {
  id: number;
  name: string;
  about: string;
}

export interface IStudent {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
