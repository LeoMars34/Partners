import { ByInsCompany } from "./ByInsCompany";

function ByInsCompanyList({ insCompany }) {
    console.log(insCompany);
    return insCompany.map((data) => <ByInsCompany key={data.id} {...data} />);
}

export { ByInsCompanyList };
