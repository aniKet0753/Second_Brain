interface ButoonInterface{
  title:string
}


export function Butoon(props: ButoonInterface) {
  return <button>
    {props.title}
  </button>
}