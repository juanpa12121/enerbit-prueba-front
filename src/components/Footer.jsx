const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <>
        <footer className=" bg-white py-10">
            <p className="text-purple-900 text-center text-2xl">Todos los Derechos reservados EnerBit | Juan Pablo Rivera<strong> {year}</strong></p>
        </footer>
    </>
  )
}

export default Footer