"use client";

interface CardProps {
  message: string;
  author: string
  date?: string;
  url_image?: string;
}

export default function CardPublication({
  message,
  date,
  author,
  url_image
}: CardProps) {

  return (
    <div className="p-4 select-none">
      <div className="bg-white border rounded-md max-w-md">
        <div className="flex items-center px-4 py-3">
          <img className="h-8 w-8 rounded-full" src="" />
          <div className="ml-3">
            <span className="font-bold">{author}</span>
          </div>
        </div>
        <img
          src={url_image}
        />
        <div className="text-sm mx-4 mt-2 mb-4">
          <span className="font-bold">{author}</span>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}
