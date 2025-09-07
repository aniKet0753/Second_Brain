import Shareicon from "../icon/shareicon";


interface Cardprops{
  title: string,
  link:string;
  type:"twitter" | "youtube";

}


export function Card({title, link, type}:Cardprops) {
  return (
    <div>
      <div className="bg-white rounded-md shadow-md border-slate-100 p-4 max-w-72 border min-h-48 min-w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-md ">
            <div className="text-gray-500 pr-2 ">
              <a href={link} target="_blank">
              </a>
              <Shareicon />

            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <Shareicon />
            </div>
            <div className="text-gray-500">
              <Shareicon />
            </div>
          </div>
        </div>
        <div className="p-3">
          {type === "youtube" && 
           <iframe
          className="w-full"
            src={link.replace("watch","embed").replace("?V=", "/")}
            title="YouTube video player"
           frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe> }
          {type ==="twitter" && 
          <blockquote  className="twitter-tweet" ><a href={link.replace("x.com", "twitter.com")}></a></blockquote>}
        </div>
      </div>
    </div>
  );
}
