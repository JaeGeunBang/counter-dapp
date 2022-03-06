export interface mainInterface {
  lang: string;
}

function state(): mainInterface {
  return {
    lang: 'kr'
  }
};

export default state;
