export type ProductCardProps = {
  title: string;
  price: string;
  total: string;
  image: string;

  onAdd: () => void;
  onRemove: () => void;
};
