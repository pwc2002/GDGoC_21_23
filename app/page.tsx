import MajorNotices from './data/MajorNotices.json';
import ScholarshipNotices from './data/ScholarshipNotices.json';

export default function Home() {
  return(
    ScholarshipNotice()
  );
}

export function ScholarshipNotice() {
  const { scholarships } = ScholarshipNotices;

  return (
    <>
      <div className="absolute top-12 left-5 object-cover h-5 w-5">
        <img src="./pngwing.com.png" alt="menu button" />
      </div>
      <div className="flex flex-col w-full max-w-[90%] h-screen absolute top-20 left-10 px-4">
        <div className="text-left text-2xl font-bold relative top-10">
          학부 공지사항
        </div>
        <div className="relative top-10 text-xl text-gray-600/75 font-semibold">
          {scholarships.map((notice) => (
            <div key={notice.id} className="relative top-5 pt-3 pb-4 flex items-start gap-5">
              <input 
                type="checkbox" 
                className="flex-shrink-0 mt-1.5"
                id={`notice-${notice.id}`}
              />
              <span className="break-keep">
                {notice.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function MajorNotice() {
  const { notices } = MajorNotices;

  return (
    <>
      <div className="absolute top-12 left-5 object-cover h-5 w-5">
        <img src="./pngwing.com.png" alt="menu button" />
      </div>
      <div className="flex flex-col w-full max-w-[90%] h-screen absolute top-20 left-10 px-4">
        <div className="text-left text-2xl font-bold relative top-10">
          학부 공지사항
        </div>
        <div className="relative top-10 text-xl text-gray-600/75 font-semibold">
          {notices.map((notice) => (
            <div key={notice.id} className="relative top-5 pt-3 pb-4 flex items-start gap-5">
              <input 
                type="checkbox" 
                className="flex-shrink-0 mt-1.5"
                id={`notice-${notice.id}`}
              />
              <span className="break-keep">
                {notice.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}