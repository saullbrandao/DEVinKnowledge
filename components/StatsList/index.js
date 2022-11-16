const calculateStats = tips => {
  const stats = {
    total: 0,
    frontEnd: 0,
    backEnd: 0,
    fullStack: 0,
    softSkill: 0,
  }

  tips.forEach(tip => {
    switch (tip.category) {
      case 'FrontEnd':
        stats.frontEnd++
        break
      case 'BackEnd':
        stats.backEnd++
        break
      case 'FullStack':
        stats.fullStack++
        break
      case 'SoftSkills':
        stats.softSkill++
        break
    }

    stats.total++
  })

  return stats
}

export const renderStats = tips => {
  const stats = calculateStats(tips)

  const statsList = document.getElementById('stats')
  statsList.replaceChildren()

  for (const [key, value] of Object.entries(stats)) {
    const capitalizedkey = key[0].toUpperCase() + key.substring(1)

    const li = document.createElement('li')
    li.classList.add('stat-item')
    li.innerHTML = `<span>${capitalizedkey}</span>
    <span>${value}</span>`

    statsList.appendChild(li)
  }
}
