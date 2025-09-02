import Image from "next/image";
import { IoIosAdd } from "react-icons/io";

type Props = {
  setFile: (val: File) => void;
  image: string;
  setImage: (val: string) => void;
};

const ProductImage = ({ setFile, setImage, image }: Props) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      setFile(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="h-[80px]  w-[100px] flex justify-center items-center rounded-md bg-white relative border border-gray-300">
        {image ? (
          <Image
            alt="product image"
            src={image}
            height={100}
            width={100}
            className="rounded-md"
          />
        ) : (
          <IoIosAdd size={20} />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProductImage;
