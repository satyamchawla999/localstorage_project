import "../../Assets/Styles/draftContainer.css";
import { useAuth } from "../../Hooks/useProvideAuth";
import DraftItem from "./DraftItem";

const DraftContainer = () => {
  const auth = useAuth();
  const user = JSON.parse(auth.user);

  let draft;

  if(user.draft) {
    draft = user.draft;
  }

  return (
    <div className="draftContainer">
      {draft && (
        <>
          {draft.map((item) => (
            <DraftItem item={item} key={item.code} />
          ))}
        </>
      )}
    </div>
  );
};

export default DraftContainer;
