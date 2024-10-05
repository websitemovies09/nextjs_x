import { useGetCaterogysQuery } from "@/redux_query/caterogy/caterogyApi";
import AddCategory from "./AddCategory";
import DeleteCategoryForm from "./DeleteCategoryForm";
import UpdateCategoryForm from "./UpdateCategoryForm";

function AdminCaterogy() {
  const { data: caterogys,refetch } = useGetCaterogysQuery();

  return (
    <div className="flex flex-wrap">
      <AddCategory refetch={refetch}/>
      <UpdateCategoryForm caterogys={caterogys} refetch={refetch}/>
      <DeleteCategoryForm caterogys={caterogys} refetch={refetch}/>
    </div>
  );
}

export default AdminCaterogy;
