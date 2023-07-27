import { AdminTable } from "./AdminTable";

function AdminTableList({
    props,
    text,
    setBanks,
    setBsoCatalogType,
    setBsoCatalogChannel,
    setBsoCatalogCompany,
    setBsoCatalogStatus,
}) {
    return props.map((data) => (
        <AdminTable
            key={data.id}
            {...data}
            text={text}
            setBanks={setBanks}
            setBsoCatalogType={setBsoCatalogType}
            setBsoCatalogChannel={setBsoCatalogChannel}
            setBsoCatalogCompany={setBsoCatalogCompany}
            setBsoCatalogStatus={setBsoCatalogStatus}
        />
    ));
}

export { AdminTableList };
