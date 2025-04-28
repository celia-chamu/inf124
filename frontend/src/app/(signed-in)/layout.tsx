import NavMenu from "@/components/NavMenu";
import "@/app/globals.css";


function Layout({children}: propTypes) {
  return (
    <div className = "flex">
        {/* <NavMenu/> */}
        <div>
          {children}
        </div>
    </div>
  );
}

type propTypes = {
  children: React.ReactNode
};

export default Layout