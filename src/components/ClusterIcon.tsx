interface Props {
  iconColor: string;
  borderColor: string;
}

export default function ClusterIcon({ borderColor, iconColor }: Props) {
  return (
    <>
      <span
        className={`w-5 h-5 rounded-md border-3 bg-clip-content border ${borderColor}  ${iconColor} p-[2px]`}
      ></span>
    </>
  );
}
