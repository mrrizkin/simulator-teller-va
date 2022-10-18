export const currency = (value: string) => {
  let masked = value;
  masked = masked.replace(/\D/g, "");
  masked = masked.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  masked = `Rp. ${masked}`;
  return masked;
};

export const onlydigit = (value: string) => {
  let normalized = value;
  normalized = normalized.replace(/\D/g, "");
  return normalized;
};

export const virtual_account = (value: string) => {
  let masked = value;
  masked = masked.replace(/\D/g, "");
  masked = masked.replace(/(\d{3})(\d{5})(\d{3})(\d{8})/, "$1-$2-$3-$4");
  return masked;
};
