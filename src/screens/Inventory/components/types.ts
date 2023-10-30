export type ProductCardProps = {
  title: string;
  image: string;
  price: string;
  onEdit: () => void;
  showCurrency?: boolean;
  onDelete: () => void;
};
