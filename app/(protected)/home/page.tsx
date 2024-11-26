"use client"
import CardPublication from "../_componentes/card";
import { useEffect, useState } from "react";
import { getPublication } from "@/actions/getPublication";
import { Publication } from "@/app/types/models";

const DashboardPage = () => {

  const [AllPublications, setAllPublications] = useState<Publication[]>([]);
  console.log(AllPublications)

  useEffect(() => {
    getPublication().then((publications) => {
      //@ts-ignore
      setAllPublications(publications);
      console.log(publications)
    })
  }, [])

  return (
    <>
      <div className="flex flex-col space-y-4 items-center">
        {AllPublications.map((publication) => (
          <CardPublication
            author={publication.user.nombre}
            key={publication.id}
            message={publication.publication_message}
            date={publication.publication_date}
            url_image={publication.url_image}
          />
        ))}
      </div>
    </>
  )
}

export default DashboardPage;
