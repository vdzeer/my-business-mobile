export type ProductCardProps = {
  title: string;
  price: string;
  total: string;

  onAdd: () => void;
  onRemove: () => void;
};
