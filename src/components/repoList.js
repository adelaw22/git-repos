import { useState, useEffect } from 'react'
import axios from 'axios'
import { AiOutlineFork, AiOutlineStar } from 'react-icons/ai'

const RepoList = () => {
  const [repoData, setRepoData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    axios.get(`https://api.github.com/users/mojombo/repos`).then((response) => {
      setRepoData(response.data)
    })
  }, [])

  const handleSearch = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = repoData.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      })
      setFilteredData(filteredData)
    } else {
      setFilteredData(repoData)
    }
  }

  return (
    <div className="repo_list">
      <div>
        <input
          type="text"
          placeholder="Find repositories..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {filteredData.slice(0, 20).map((renderRepo) => {
        return (
          <div className="repo mb-5 " key={renderRepo.id}>
            <div className="d-flex ">
              <h5>{renderRepo.name}</h5>
              <span className="vis-box ms-2">{renderRepo.visibility}</span>
            </div>
            <p>{renderRepo.escription}</p>

            <div className="project-details mb-2">
              <span>
                <b>lang:</b> {renderRepo.language}
              </span>
              <span>
                <AiOutlineFork />
                {renderRepo.forks_count}
              </span>
              <span>
                <AiOutlineStar />
                {renderRepo.stargazers_count}
              </span>
              <span>
                <b>Updated:</b>{' '}
                {new Date(renderRepo.updated_at).toLocaleString()}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RepoList
