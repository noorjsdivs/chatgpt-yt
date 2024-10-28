import useSWR from "swr";
import dynamic from "next/dynamic";

// Dynamically import react-select without SSR
const Select = dynamic(() => import("react-select"), { ssr: false });

const fetchModels = () => fetch("/api/engines").then((res) => res.json());
const ModelSelection = () => {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "gpt-4-turbo",
  });

  return (
    <Select
      isSearchable={true}
      isLoading={isLoading}
      menuPosition="fixed"
      options={models?.modelOptions}
      defaultValue={model}
      placeholder={model}
      className="text-black placeholder:text-white w-full"
      onChange={(e) => setModel((e as { value: string }).value)}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? "blue" : "#ffffff50",
          backgroundColor: "transparent",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "#ffffff",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
      }}
    />
  );
};

export default ModelSelection;
