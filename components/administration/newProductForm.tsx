"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Button,
} from "@/components/ui";
import { FaAngleRight, FaCartPlus } from "react-icons/fa6";
import { useRef, useState } from "react";
import Compressor from "compressorjs";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { productsShema } from "@/validations/productsSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

type newProduct = {
  name: string;
  description: string;
  price: number;
  picture: any;
};

export default function NewProductForm() {
  const { toast } = useToast();
  let pic = useRef<HTMLInputElement>(null);
  let [image, setImage] = useState<Blob | MediaSource>();
  let [compresedUrd, setCompresedUrl] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newProduct>({
    resolver: zodResolver(productsShema),
  });

  interface File {
    [key: string]: any;
  }

  // Definir el tipo para el resultado de la compresión

  // No necesitas definir un tipo personalizado para la promesa
  // Puedes trabajar directamente con Promise<CompressedResult>

  const compress = (imagen: Blob | File): Promise<Blob | MediaSource> => {
    return new Promise((resolve, reject) => {
      new Compressor(imagen, {
        quality: 0.6,
        success(result: Blob | MediaSource) {
          resolve(result);
        },
        error(err: Error) {
          console.log(err.message);
          reject(err);
        },
      });
    });
  };

  const mostrarImagenComprimida = async () => {
    if (pic.current?.files) {
      const imagen = pic.current.files[0];

      try {
        const result = await compress(imagen);

        if (result) {
          setImage(result);
          const url = URL.createObjectURL(result);
          setCompresedUrl(url);
        }
      } catch (error) {
        console.error("Error al comprimir la imagen:", error);
      }
    }
  };

  const onSubmit: SubmitHandler<newProduct> = async (data) => {
    const reader = new FileReader();
    console.log(data);

    console.log(image);

    if (image) {
      reader.onload = function (event) {
        const arrayBuffer = event.target?.result;
        data.picture = arrayBuffer;
      };
      reader.readAsArrayBuffer(image as Blob);
    }

    try {
      console.log(data);

      await axios.post("/api/products", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast({
        variant: "default",
        className: "bg-green-300",
        title: "Felicitaciones",
        description: "Usuario creado exitosamente",
      });
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        switch (error.response?.data.code) {
          case "P2002":
            toast({
              variant: "destructive",
              title: "Error al crear usuario",
              description:
                "El " + error.response?.data.meta.target[0] + " ya existe",
            });

            break;

          case "P1001":
            toast({
              variant: "destructive",
              title: "Error al crear usuario",
              description: "Imposible conectar con la DB",
            });

            break;

          default:
            toast({
              variant: "destructive",
              title: "Error al crear usuario",
              description: "Contacte con soporte",
            });

            break;
        }
      } else {
        console.log("siu");
        toast({
          variant: "destructive",
          title: "Error al crear usuario",
          description: "Contacte con soporte",
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        <Button className="w-11/12 mx-2 mt-2 bg-gradient-to-br from-blue-500 to-indigo-500 hover:ring hover:ring-blue-500 hover:outline-none hover:ring-offset-2">
          <FaCartPlus className="mx-4" />
          Crear nuevo Producto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nevo producto</DialogTitle>
          <DialogDescription>
            Aquí podras crear un nuevo producto
          </DialogDescription>
        </DialogHeader>
        {compresedUrd && (
          <Image
            width={340}
            height={200}
            className="rounded-xl"
            src={compresedUrd}
            alt="Imagen Comprimida"
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="picture">Foto del producto</Label>
          <Input
            ref={pic}
            id="picture"
            type="file"
            onChange={mostrarImagenComprimida}
            className="border-purple-500 outlined border-2 focus:ring-4 ring-0 ring-purple-300"
          />
          <Label htmlFor="name" className="ms-1 mb-1">
            Nombre
          </Label>
          <Input
            id="email"
            type="text"
            {...register("name")}
            placeholder="Platanito"
            className="border-purple-500 outlined border-2 focus:ring-4 ring-0 ring-purple-300"
          />
          {errors.name?.message && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
          <Label htmlFor="description" className="ms-1 mb-1">
            Descripción
          </Label>
          <Input
            id="description"
            type="text"
            {...register("description")}
            placeholder="Una fruta muy rica"
            className="border-purple-500 outlined border-2 focus:ring-4 ring-0 ring-purple-300"
          />
          {errors.description?.message && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
          <Label htmlFor="price" className="ms-1 mb-1">
            Precio
          </Label>
          <Input
            id="price"
            type="number"
            {...register("price")}
            placeholder="25"
            className="border-purple-500 outlined border-2 focus:ring-4 ring-0 ring-purple-300"
          />
          {errors.price?.message && (
            <p className="text-red-500">{errors.price.message}</p>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              className="flex pe-2 mt-2 bg-gradient-to-r from-purple-500 to-blue-400"
            >
              Submit
              <FaAngleRight className="ms-2" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
