export interface loginInterface {
  type: string;
}

function state(): loginInterface {
  return {
    type: ''
  }
};

export default state;
