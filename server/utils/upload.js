const generate_name = (file) => {
  const ext = file.mimetype.split("/")[1];
  const name = file.name.split(".")[0];

  return name + "-" + Date.now() + "." + ext; 
}

exports.generate_name = generate_name;