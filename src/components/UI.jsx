const DownloadButton = () => {
    return (
      <button
        className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
        onClick={() => {}}
      >
        Download
      </button>
    );
  };
  import { logo } from "../Images";

export const UI = () => {
    return (
        <main className="pointer-events-none fixed z-10 inset-0 select-none" >
            <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
                <div className="flex justify-between items-center p-10">

                    <a
                        className="pointer-events-auto"
                        href="/"
                    >
                        <img className="w-20" src={logo} />
                    </a>
                    <div className="flex items-cente gap-2">
                        <DownloadButton />
                    </div>
                </div>
            </div>
        </main>
    );
}
