const Table = () => {
  const data = [
    {
      thumbnail: "https://via.placeholder.com/40",
      name: "Lorem Ipsum",
      address: "113 Bellhaven Road, Toronto, ON",
      tags: ["Small Townhouse", "Mid - Century"],
      scout: "Jon Snow",
    },
    {
      thumbnail: "https://via.placeholder.com/40",
      name: "Lorem Ipsum",
      address: "113 Bellhaven Road, Toronto, ON",
      tags: ["Forest Trails", "Children's Park", "Small Amusement Park"],
      scout: "You",
    },
    {
        thumbnail: "https://via.placeholder.com/40",
        name: "Lorem Ipsum",
        address: "113 Bellhaven Road, Toronto, ON",
        tags: ["Forest Trails", "Children's Park", "Small Amusement Park","Forest Trails", "Children's Park", "Small Amusement Park","Forest Trails", "Children's Park", "Small Amusement Park"],
        scout: "You",
      },  {
        thumbnail: "https://via.placeholder.com/40",
        name: "Lorem Ipsum",
        address: "113 Bellhaven Road, Toronto, ON",
        tags: ["Forest Trails", "Children's Park", "Small Amusement Park"],
        scout: "You",
      },  ];

  return (
    <div className="p-4">
      <table className="w-full text-left border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 border-b">Thumbnail</th>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Address</th>
            <th className="p-4 border-b">Tags</th>
            <th className="p-4 border-b">Scout</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-4 border-b">
                <img src={item.thumbnail} alt="Thumbnail" className="w-10 h-10" />
              </td>
              <td className="p-4 border-b">{item.name}</td>
              <td className="p-4 border-b">{item.address}</td>
              <td className="p-4 border-b">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-4 border-b">{item.scout}</td>
              <td className="p-4 border-b">
              <a className="waves-effect waves-light btn float-right">Edit</a>

                <a className="waves-effect waves-light btn float-right">Delete</a>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
