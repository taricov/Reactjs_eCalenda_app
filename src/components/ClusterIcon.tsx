interface Props {
  iconColor: string;
}

export default function ClusterIcon({ iconColor }: Props) {
  return (
    <>
      <span
        className={`w-5 h-5 rounded-md border-3 bg-clip-content border border-${iconColor}  bg-${iconColor} p-[2px]`}
      ></span>
    </>
  );
}
