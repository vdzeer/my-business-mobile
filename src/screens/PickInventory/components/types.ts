export type ProductCardProps = {
  title: string;
  image: string;
  onAdd: () => void;

  onRemove: () => void;
  total: number;
};
